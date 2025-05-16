import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLLMInference = createAsyncThunk(
  "llmInference/fetchLLMInference",
  async (msg, thunkAPI) => {
    console.log("fetchLLMInference called with msg:", msg); // DEBUG
    try {
      const formData = new FormData();
      formData.append("text", msg); 
      console.log("Sending to http://127.0.0.1:5000/chat with formData:", formData.get("text")); // DEBUG
      
      // For FormData, Content-Type is usually set automatically by axios,
      // or it should be 'multipart/form-data'.
      // If Flask expects 'application/x-www-form-urlencoded', how you build the body might need to change
      // (e.g., new URLSearchParams(formData).toString()) or ensure Flask handles multipart.
      // Let's try without explicitly setting Content-Type first, as Axios often does this well.
      const response = await axios.post("http://127.0.0.1:5000/chat", formData, {
        headers: {
          'Content-Type': 'application/multipart/form-data' // Or 'multipart/form-data' if sending files, but for simple text 'application/x-www-form-urlencoded' is common for Flask forms. Or let Axios decide if not setting.
        }
      });
      
      console.log("Response from backend:", response); // DEBUG
      
      // Assuming backend /chat endpoint sends { status: "success", response: "chatbot reply" }
      if (response.data && response.data.status === "success" && response.data.response !== undefined) {
        return response.data.response.toString();
      } else if (response.data && response.data.text !== undefined) { // Fallback for the other endpoint structure
        return response.data.text.toString();
      }
      else {
        console.error("Backend response error or unexpected structure:", response.data);
        return thunkAPI.rejectWithValue(response.data?.message || "Unknown backend error or malformed success response");
      }
    } catch (error) {
      console.error("Error in fetchLLMInference:", error.response || error.message); // DEBUG
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Network or CORS error");
    }
  }
);

export const BotOpen = createSlice({
  name: "BotUI",
  initialState: {
    isBotOpen: false,
  },
  reducers: {
    togglebot: (state) => {
      state.isBotOpen = !state.isBotOpen;
    },
    setBot: (state, action) => {
      state.isBotOpen = action.payload;
    },
  },
});

export const llmInferenceSlice = createSlice({
  name: "llmInference",
  initialState: {
    inferenceResult: "",
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLLMInference.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLLMInference.fulfilled, (state, action) => {
        state.status = "idle";
        state.inferenceResult = action.payload;
      })
      .addCase(fetchLLMInference.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectInferenceResult = (state) =>
  state.llmInference.inferenceResult;

export const isbotOpen = (state) => state.BotUI.isBotOpen;

export default llmInferenceSlice.reducer;
