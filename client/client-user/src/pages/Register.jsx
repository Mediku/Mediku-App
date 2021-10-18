import React from 'react'
import {Link} from 'react-router-dom'

function Register() {
    return (
        <div>
            <div className="flex justify-center items-center w-full my-10">
                <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                    <h2 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Form pendaftaran</h2>
                    <p class="block w-full text-center text-gray-800 text-2xs font-bold mb-6">Daftar baru atau <Link to="/login">Login</Link></p>
                    <form action="/" method="post">
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800" type="text" name="phone_number" id="phone_number" placeholder="Phone number"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800" type="text" name="full_name" id="full_name" placeholder="Full Name"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="Select">Tipe ID</label>
                        <select class="border py-2 px-3 text-grey-800">
                            <option selected disabled>--select one--</option>
                            <option>Identity Card(NIK)</option>
                            <option>Passport</option>
                        </select>
                    </div>
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800" type="text" name="identity_card_number" id="identity_card_number" placeholder="Identity Card Number"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                                                <label class="mb-2 font-bold text-lg text-gray-900" for="gender">Gender</label>

                        <input type="radio" id="gender" name="gender" value="female"></input>
                        <label for="female">Female</label>
                        <input type="radio" id="gender" name="gender" value="male"></input>
                        <label for="male">Male</label>


                    </div>
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800" type="email" name="email" id="email" placeholder="Email"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <textarea class="border py-2 px-3 text-grey-800"  name="identity_card_address" id="identity_card_address" placeholder="Identity Card address"></textarea>
                    </div>
                    <div class="flex flex-col mb-4">
                        <textarea class="border py-2 px-3 text-grey-800"  name="domisili_address" id="domisili address" placeholder="Domisili address"></textarea>
                    </div>
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800"  type="password"name="password" id="password" placeholder="Password"></input>
                    </div>
                    <button class="block bg-blue-600 hover:bg-blue-900 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Submit form</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
