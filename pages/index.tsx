import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { Proyecto } from "@/types/types";
import Image from "next/image"
import { Inter } from "next/font/google"



export default function Home() {
  return (
    <div className="w-screen mt-2 max-w-6xl border-2 px-6 py-6">
        <div className="flex">
            <img
                src="home.png"
                alt="home"
                className="mb-5"
            />
            <h1 className="text-2xl font-semibold mt-1 ml-3 mb-5">Home</h1>
        </div>

        <div className="font-semibold">
            <h1>¡Bienvenido a la página interna de PSA! donde podrá:</h1>
            <h1 className="ml-10"> - Seguir todos sus proyectos</h1>
            <h1 className="ml-10"> - Seguir todas sus tareas</h1>
            <h1 className="ml-10"> - Ver todos los tickets</h1>
            <h1 className="ml-10"> - Actualizar el estado de sus proyectos y tareas</h1>
            <h1>¡Entre muchas otras funcionalidades! Esperamos que esta página le sirva para llevar a cabo todos sus proyectos</h1>

        </div>
        <div className="flex gap-8 mt-10">
            <li className="bg-zinc-200 hover:bg-zinc-100 px-4 py-14 border rounded w-[200px] h-[200px] ml-10">
                <Link href="/proyectos" className="text-3xl">
                    <div className="text-center">
                        <h1 className="text-4xl mb-2">📈</h1>
                        <h1 className="font-semibold">Proyectos</h1>
                    </div>
                </Link>
            </li>
            <li className="bg-zinc-200 hover:bg-zinc-100 px-4 py-14 border rounded w-[200px] h-[200px]">
                <Link href="/soporte" className="text-3xl">
                    <div className="text-center">
                        <h1 className="text-4xl mb-2">🔧</h1>
                        <h1 className="font-semibold">Soporte</h1>
                    </div>
                </Link>
            </li>
            <li className="bg-zinc-200 hover:bg-zinc-100 px-4 py-14 border rounded w-[200px] h-[200px]">
                <Link href="/home" className="text-3xl">
                    <div className="text-center">
                        <h1 className="text-4xl mb-2">👤</h1>
                        <h1 className="font-semibold">Clientes</h1>
                    </div>
                </Link>
            </li>
            <li className="bg-zinc-200 hover:bg-zinc-100 px-4 py-14 border rounded w-[200px] h-[200px]">
                <Link href="/home" className="text-3xl">
                    <div className="text-center">
                        <h1 className="text-4xl mb-2">👥</h1>
                        <h1 className="font-semibold">Usuarios</h1>
                    </div>
                </Link>
            </li>

        </div>
    </div>

  )
}