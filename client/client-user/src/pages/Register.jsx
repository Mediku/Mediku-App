import React from 'react'

function Register() {
    return (
        <div>
            <div className="flex justify-center items-center w-full">
                <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                    <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Component Form</h1>
                    <form action="/" method="post">
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">First Name</label>
                        <input class="border py-2 px-3 text-grey-800" type="text" name="first_name" id="first_name"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Last Name</label>
                <input class="border py-2 px-3 text-grey-800" type="text" name="last_name" id="last_name"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="email">Email</label>
                        <input class="border py-2 px-3 text-grey-800" type="email" name="email" id="email"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="password">Password</label>
                        <input class="border py-2 px-3 text-grey-800" type="password" name="password" id="password"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="Date">Date</label>
                        <input class="border py-2 px-3 text-grey-800" type="date" name="date" id="date"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="File">File</label>
                        <input class="border py-2 px-3 text-grey-800" type="file" name="file" id="file"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="color">Range</label>
                        <input class="border py-2 text-grey-800" type="range" name="range" id="range"></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="textarea">textarea</label>
                        <textarea class="border py-2 px-3 text-grey-800" name="textarea" id="textarea"></textarea>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="mb-2 font-bold text-lg text-gray-900" for="Select">Select</label>
                        <select class="border py-2 px-3 text-grey-800">
                            <option>Surabaya</option>
                            <option>Jakarta</option>
                            <option>Bandung</option>
                            <option>Mojokerto</option>
                        </select>
                    </div>
                    <button class="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
