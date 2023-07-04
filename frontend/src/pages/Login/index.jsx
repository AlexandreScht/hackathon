import React, { useContext,useState } from 'react';

// import { useNavigate } from 'react-router-dom';


import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState('');




    const utilisateurs = new Map([]);

    utilisateurs.set('antoine.mosleh', 'antoinemosleh');

    utilisateurs.set('thibault.valat', 'thibaultvalat');

    utilisateurs.set('yvan.thai', 'yvanthai');




    // const navigate = useNavigate();




    const handleUsernameChange = (e) => {

        setUsername(e.target.value);

    };




    const handlePasswordChange = (e) => {

        setPassword(e.target.value);

    };




    const handleSubmit = (e) => {

        e.preventDefault();

        if (utilisateurs.has(username) && utilisateurs.get(username) === password) {

            setError('');

            // navigate('/home');

            router.push('/home');

        } else {

            setError('Identifiants invalides');

        }

    };





    return (

        <div className="bg-blue-950 flex min-h-full flex-1 flex-col justify-center px-48 py-48 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-lg">

                {/* <img

                    className="mx-auto h-20 w-auto"

                    src="mars.png"

                    alt="Your Company"

                /> */}

                <img

                    className="mx-auto h-20 w-auto"

                    src="/mars.png"

                    alt="Your Company"

                />




                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-rose-50">

                    Connectez-vous à votre compte

                </h2>

            </div>




            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <div onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">

                    <div>

                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-rose-50">

                            Nom d'utilisateur

                        </label>

                        <div className="mt-2">

                            <input

                                id="username"

                                name="username"

                                value={username}

                                type="text"

                                onChange={handleUsernameChange}

                                required

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />

                        </div>

                    </div>




                    <div>

                        <div className="block text-sm font-medium leading-6 text-rose-50">

                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-rose-50">

                                Mot de passe

                            </label>

                        </div>

                        <div className="mt-2">

                            <input

                                id="password"

                                name="password"

                                type="password"

                                value={password}

                                onChange={handlePasswordChange}

                                autoComplete="current-password"

                                required

                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />

                        </div>

                    </div>




                    <div>

                        <button

                            type="submit"

                            className="flex w-full justify-center rounded-md bg-rose-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                        >

                            Sign in

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};




Login.isPublic = true;




export default Login;