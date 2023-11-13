import { Box, Button, Flex, FormControl, Heading, IconButton, Input, InputGroup, InputRightElement, Link, Select, Stack, Text } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastChakra } from "../../helpers/toast";
import { login, reset } from "../../features/authSlice";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import bgGradient from '../../assets/img/gradient-bg.svg';

const Login = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let MODALIDAD = [
        { value: 'EBR', label: 'ADMINISTRADOR' },
        { value: 'CEBA', label: 'DOCENTES' },
        { value: 'REDIDENCIA', label: 'ALUMNO' },
    ];

    const initialValues = {
        correo: '',
        password: '',
        modalidad: '',
    };

    const validationSchema = Yup.object({
        correo: Yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
        modalidad: Yup.string().required('La modalidad es requerida'),
    });

    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {

        if (isError) {
            ToastChakra('Mensaje', message, 'error', 2500, 'bottom');
        }

        dispatch(reset());

    }, [dispatch, isSuccess, isError, message, navigate]);

    const handleLogin = (values, { setSubmitting }) => {
        const userData = {
            correo: values.correo,
            password: values.password,
            modalidad: values.modalidad,
        };
        dispatch(login(userData));
        setSubmitting(false);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            enableReinitialize={true}
        >
            {({ isSubmitting, values, handleChange }) => (
                <Form>
                    <Flex
                        align="center"
                        justify="center"
                        minHeight="100vh"
                        bgImage={bgGradient}
                        bgSize="cover"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                    >
                        <Box
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                                borderWidth: '1px',
                                borderColor: 'gray.700',
                            }}
                            p={4}
                            rounded="xl"
                            shadow="md"
                            maxW="md"
                            w="full"
                        >
                            <Stack spacing={4} p={4}>

                                <Box textAlign="center" style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', overflow: 'hidden', width: '150px', height: '150px', margin: 'auto', marginTop: '20px' }}>
                                        <img src="https://demos.ovdivi.com/wp-content/uploads/2023/08/ovdivi_perfil_2-300x300.png" alt="Profile" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
                                    </div>
                                    <Heading fontSize={'3xl'} fontWeight="black" style={{ marginTop: '20px' }}>¡Bienvenido!</Heading><br />
                                    <Text fontSize={'sm'}>
                                        Inicia sesión con tu usuario y contraseña{" "}
                                        <Link as={NavLink} to={'/register'} fontWeight={'semibold'} color="purple.600" textDecoration="none">
                                            SGE
                                        </Link>
                                    </Text>
                                </Box>

                                <Stack spacing={2}>
                                    <Field name="correo">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.correo && form.touched.correo}>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Ingrese su correo"
                                                    value={values.correo}
                                                    _focus={{
                                                        borderColor: 'purple.600',
                                                        boxShadow: 'none',
                                                    }}
                                                    defaultValue={form.touched.correo}
                                                    size="sm" // Ajustar el tamaño del campo de entrada
                                                />
                                                <ErrorMessage name="correo" component={Text} color="red.500" fontSize="xs" mt={1} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <InputGroup size="sm">{/* Ajustar el tamaño del grupo de entrada */} 
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        value={values.password}
                                                        _focus={{
                                                            borderColor: 'purple.600',
                                                            boxShadow: 'none',
                                                        }}
                                                        placeholder="Ingrese su contraseña"
                                                        size="sm" // Ajustar el tamaño del campo de entrada
                                                    />
                                                    <InputRightElement w={'3.5rem'}>
                                                        <IconButton
                                                            h="1.5rem" // Ajustar el tamaño del icono del botón
                                                            alignSelf={'center'}
                                                            color={'white'}
                                                            bg="#4741d7"
                                                            _hover={{ bg: '#4741d7' }}
                                                            onClick={handleShowClick}
                                                            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                            size="sm" // Ajustar el tamaño del botón
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <ErrorMessage name="password" component={Text} color="red.500" fontSize="xs" mt={1} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="modalidad">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.modalidad && form.touched.modalidad}>
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione modalidad"
                                                    _focus={{
                                                        borderColor: 'purple.600',
                                                        boxShadow: 'none',
                                                    }}
                                                    value={values.modalidad}
                                                    onChange={handleChange}
                                                    size="sm" // Ajustar el tamaño del selector
                                                >
                                                    {MODALIDAD.map((item, index) => (
                                                        <option key={index} value={item.value}>
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                                <ErrorMessage name="modalidad" component={Text} color="red.500" fontSize="xs" mt={1} />
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Button
                                    colorScheme="purple"
                                    bg="#4741d7"
                                    color="white"
                                    _hover={{
                                        bg: '#5d59e0',
                                    }}
                                    _dark={{
                                        bg: '#4741d7',
                                        color: 'white',
                                        _hover: {
                                            bg: '#5d59e0',
                                        },
                                    }}
                                    fontSize="sm" // Ajustar el tamaño de la fuente del botón
                                    textTransform="uppercase"
                                    fontWeight="semibold" // Ajustar el peso de la fuente del botón
                                    w="full"
                                    borderRadius={'md'} // Ajustar el radio de la esquina del botón
                                    type="submit"
                                    isLoading={isLoading ? true : false}
                                    disabled={isSubmitting}
                                    loadingText="Ingresando..."
                                    spinnerPlacement="end"
                                >
                                    Iniciar sesión
                                </Button>

                                <Stack direction="row" justify="center" fontSize="sm">
                                    <Link as={NavLink} to={'/forgot-password'} fontWeight={'semibold'} color="purple.600" textDecoration="none" textAlign={'center'}>
                                        Olvidé mi contraseña
                                    </Link>
                                </Stack>
                            </Stack>
                        </Box>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default Login;


