export default function ClientGridRow({ cliente }: {cliente: any}) {

    return (
        <tr key={`${cliente['razon social']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{cliente['id']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{cliente['razon social']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">{cliente['CUIT']}</div>
            </td>
        </tr>
    )
}
