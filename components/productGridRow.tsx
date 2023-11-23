import Link from "next/link";
export default function ProductGridRow({ Producto }: {Producto: any}) {

    return (
        <tr key={`${Producto['razon social']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{Producto['id']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <Link href={`/soporte/${Producto['id']}`}>
                <div className="flex items-center">{Producto['producto']}</div>
                </Link>
            </td>

        </tr>
    )
}
