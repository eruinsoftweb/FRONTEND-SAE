// asignaturaSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asignaturaService from "../services/asignatura.service";

const initialState = {
    asignaturas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createAsignatura = createAsyncThunk(
    "asignatura/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await asignaturaService.createAsignatura(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAsignaturas = createAsyncThunk(
    "asignaturas/getAsignaturas",
    async (_, thunkAPI) => {
        try {
            return await asignaturaService.getAllAsignaturas();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateAsignatura = createAsyncThunk(
    "asignatura/update",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await asignaturaService.updateAsignatura(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteAsignatura = createAsyncThunk(
    "asignaturas/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await asignaturaService.deleteAsignatura(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const asignaturaSlice = createSlice({
    name: "asignaturas",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsignaturas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAsignaturas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.asignaturas = action.payload;
            })
            .addCase(getAsignaturas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createAsignatura.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAsignatura.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.asignaturas.push(action.payload);
            })
            .addCase(createAsignatura.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteAsignatura.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAsignatura.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.asignaturas = state.asignaturas.filter(
                    (asignatura) => asignatura._id !== action.payload._id
                );
            })
            .addCase(deleteAsignatura.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateAsignatura.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAsignatura.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.asignaturas = state.asignaturas.map((asignatura) =>
                    asignatura._id === action.payload._id ? action.payload : asignatura
                );
            })
            .addCase(updateAsignatura.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = asignaturaSlice.actions;
export default asignaturaSlice.reducer;
