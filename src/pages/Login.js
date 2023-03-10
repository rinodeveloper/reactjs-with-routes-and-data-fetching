import { useEffect, useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'

import {
    Auth,
    createAuthToken,
    setJwtToken,
    redirectIfHasActiveToken
} from '../api/Auth'

import { loginFormValidation } from '../validations/LoginFormValidation'



export default function Login() {

    redirectIfHasActiveToken()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        document.title = 'Elearning - Login';
    }, []);


    const submitLogin = async (e) => {
        e.preventDefault()
        const isValidForm = loginFormValidation(loginData)
        //Si se ha creado el usuario, creamos ahora un jwt para su sesión/consultas
        if (Boolean(isValidForm)) {
            const userToken = await createAuthToken({ ...Auth(), loginData })
            //Redirecciona al perfil de usuario        
            if (userToken) { setJwtToken(userToken) }

        }

    }

    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <a href='/'>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </a>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        ¡Conéctate con tu equipo de trabajo!
                    </h2>

                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onChange={handleChange} onSubmit={submitLogin}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Correo
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Aquí tu correo empresarial"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Escribe tu clave super secreta"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Mantener la sesión
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/restore-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-200 group-hover:text-indigo-200" aria-hidden="true" />
                            </span>
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}