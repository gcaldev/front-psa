import {useEffect, useState} from "react";
import Link from "next/link";
import ProductGridRow from "@/components/productGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Clientes() {
    const [list, setList] = useState([])

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/nicolasgirardi/productos/productos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Productos</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Producto" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((Producto) => (
                                    <ProductGridRow key={Producto['id']} Producto={Producto} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
