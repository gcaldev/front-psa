export default function UserGridRow({ usuario }: {usuario: any}) {
  return (
    <tr key={`${usuario['Nombre']}-${usuario['Apellido']}`}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{usuario['legajo']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{usuario['Nombre']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{usuario['Apellido']}</div>
      </td>
    </tr>
  )
}
