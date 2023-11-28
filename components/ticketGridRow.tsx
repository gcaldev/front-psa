import Link from "next/link";
export default function TicketGridRow({ Ticket }: {Ticket: any}) {

    return (
        <tr key={`${Ticket['id_ticket']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">{Ticket['id_ticket']}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <Link href={`/soporte/${Ticket['producto_id']}/${Ticket['version_id']}`}>
                <div className="flex items-center">{Ticket['id_ticket']}</div>
                </Link>
            </td>

        </tr>
    )
}
