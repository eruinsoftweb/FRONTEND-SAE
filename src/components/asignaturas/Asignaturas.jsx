import React, { useEffect, useState } from 'react';
import { Badge, Box, Checkbox, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { AlertEliminar } from './AlertEliminar';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { getAsignaturas, reset } from '../../features/asignaturaSlice';
import ModalAgregarAsignaturas from './ModalAgregarAsignaturas';
import ModalEditarAsignaturas from './ModalEditarAsignaturas';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Asignaturas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { asignaturas, isLoading, isError, message } = useSelector((state) => state.asignaturas);

    const [modalidad, setModalidad] = useState('TODOS');

    const handleModalidadChange = (event) => {
        setModalidad(event.target.value);
    };

    let asignaturasFiltrados = asignaturas;

    if (modalidad !== 'TODOS') {
        asignaturasFiltrados = asignaturas.filter(
            (grado) => grado.modalidad === modalidad
        );
    }

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getAsignaturas())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            resizable: true
        },
        {
            name: 'NIVEL',
            selector: row => row.nivel,
            sortable: true,
            cellExport: row => row.nivel,
            resizable: true
        },
        {
            name: 'MODALIDAD',
            selector: row => { return row.modalidad },
            sortable: true,
            cellExport: row => row.modalidad,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.modalidad === 'EBR' ? 'messenger' : row.modalidad === 'CEBA' ? 'purple' : 'teal'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.modalidad}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado === true ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === true ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === true ? 'green' : 'red'}
                        variant="solid"
                        w={24}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell: row => (
                <div>
                    <ModalEditarAsignaturas row={row} />
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '140px'
        }
    ]

    const tableData = {
        columns: columns,
        data: asignaturasFiltrados,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <ModalAgregarAsignaturas />
                <HStack spacing={4} direction="row">
                    <Checkbox
                        value="EBR"
                        size='lg'
                        colorScheme='messenger'
                        isChecked={modalidad === 'EBR'}
                        onChange={handleModalidadChange}
                    >
                        ADMIN
                    </Checkbox>
                    <Checkbox
                        value="CEBA"
                        size='lg'
                        colorScheme='purple'
                        isChecked={modalidad === 'CEBA'}
                        onChange={handleModalidadChange}
                    >
                        DOCENTE
                    </Checkbox>
                    <Checkbox
                        value="RESIDENCIA"
                        size='lg'
                        colorScheme='teal'
                        isChecked={modalidad === 'RESIDENCIA'}
                        onChange={handleModalidadChange}
                    >
                        ALUMNO
                    </Checkbox>
                    <Checkbox
                        value="TODOS"
                        size='lg'
                        colorScheme='gray'
                        isChecked={modalidad === 'TODOS'}
                        onChange={handleModalidadChange}
                    >
                        TODOS
                    </Checkbox>
                </HStack>
            </Stack>
            <Box
                rounded="2xl"
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000" }}
                mt={2}
                pt={2}
            >
                <DataTableExtensions
                    {...tableData}
                    print={false}
                    exportHeaders={true}
                    filterPlaceholder="BUSCAR"
                    numberOfColumns={7}
                    fileName={'ASIGNATURAS'}
                >
                    <DataTable
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination={true}
                        paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationRowsPerPageOptions={[5, 10, 25, 50]}
                        paginationPerPage={10}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por pagina:',
                            rangeSeparatorText: 'de',
                            noRowsPerPage: false,
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }}
                        theme={themeTable}
                        customStyles={customStyles}
                        pointerOnHover={true}
                        responsive={true}
                        noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Asignaturas;