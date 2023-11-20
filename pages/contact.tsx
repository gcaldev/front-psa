import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Contact() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <h1 className="text-4xl mb-5 font-bold">Contact</h1>
      <span className="text-7xl">🏡</span>
    </div>
  )
}
