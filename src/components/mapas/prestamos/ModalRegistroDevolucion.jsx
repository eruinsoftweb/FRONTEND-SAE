import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { updatePrestamoMapa } from '../../../features/prestamo_mapaSlice';

const ModalRegistrarDevolucion = ({ row }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        id_ : null,
        codigo: '',
        estudiante: '',
        fecha_devolucion: '',
        descripcion_devolucion: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = (data) => {
        setIsModalOpen(!isModalOpen)
        setIndice(data);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updatePrestamoMapa(indice));
        setIsModalOpen(false);
        setIndice(initialValues);
    }

    return (
        <>
            <Tooltip hasArrow label='Registrar devolución' placement='auto'>
                <IconButton
                    colorScheme="messenger"
                    _dark={{ color: "white", _hover: { bg: "messenger.600" } }}
                    aria-label="Agregar"
                    icon={<Icon as={MdOutlineSettingsBackupRestore} fontSize="2xl" />}
                    variant="ghost"
                    onClick={() => handleModalOpen(row)}
                    ml={2}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="6xl" isCentered>
                <ModalOverlay />
                <form onSubmit={handleSave}>
                    <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                        <ModalHeader textAlign="center">REGISTRAR DEVOLUCIÓN DEL PRESTAMO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">CODIGO</FormLabel>
                                        <Input
                                            type={'text'}
                                            placeholder='Ingrese el codigo'
                                            defaultValue={indice ? indice.codigo : ''}
                                            onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
                                            textTransform={'uppercase'}
                                            isReadOnly
                                        />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">FECHA DEVOLUCIÓN</FormLabel>
                                        <Input
                                            type={'datetime-local'}
                                            onChange={(e) => setIndice({ ...indice, fecha_devolucion: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>

                            <Stack spacing={2} direction="column" justifyContent="space-between" mt={2}>

                                <FormControl>
                                    <FormLabel fontWeight="semibold">DESCRIPCION DE LA DEVOLUCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Descripcion del estado de la devolucion del libro"
                                        defaultValue={indice ? indice.descripcion_devolucion : ''}
                                        onChange={(e) => setIndice({ ...indice, descripcion_devolucion: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                                    <Textarea
                                        placeholder="Observaciones adicionales de la entrega"
                                        defaultValue={indice ? indice.observaciones : ''}
                                        onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }}
                                mr={3}
                                onClick={handleModalClose}
                                borderRadius="xl"
                            >
                                CANCELAR
                            </Button>
                            <Button
                                colorScheme="purple"
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                mr={3}
                                type='submit'
                                isDisabled={ !indice?.codigo || !indice.descripcion_devolucion }
                                borderRadius="xl"
                            >
                                REGISTRAR DEVOLUCIÓN
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default ModalRegistrarDevolucion;