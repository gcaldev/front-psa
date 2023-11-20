import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

function Button() {
  return <button />
}

export default function Phone() {
  return (
    <div className="flex h-full flex-col bg-white">
      <h1 className="text-4xl mb-5 font-bold place-self-center">Phone</h1>
      <table className="place-self-start">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Phone
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}
