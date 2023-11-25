import Link from "next/link";
export default function VersionGridRow({ Version }: {Version: any}) {

    return (
        <tr key={`${Version['id']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{Version['id']}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <Link href={`/soporte/${Version['productoId']}/${Version['id']}`}>
                <div className="flex items-center">{Version['version']}</div>
                </Link>
            </td>

        </tr>
    )
}
