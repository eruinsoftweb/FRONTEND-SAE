import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Obtener todas las asignaturas
const getAllAsignaturas = async () => {
    const response = await axios.get(`${API_URL}/asignaturas`);
    return response.data;
}

// Obtener una asignatura específica
const getAsignatura = async (id) => {
    const response = await axios.get(`${API_URL}/asignaturas/${id}`);
    return response.data;
}

// Crear una asignatura
const createAsignatura = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/asignaturas`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('ASIGNATURA REGISTRADA', 'La asignatura se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

// Actualizar una asignatura
const updateAsignatura = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/asignaturas/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ASIGNATURA MODIFICADA', 'La asignatura ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

// Eliminar una asignatura
const deleteAsignatura = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/asignaturas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ASIGNATURA ELIMINADA', 'La asignatura se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const asignaturaService = {
    getAllAsignaturas,
    getAsignatura,
    createAsignatura,
    updateAsignatura,
    deleteAsignatura,
}

export default asignaturaService;
