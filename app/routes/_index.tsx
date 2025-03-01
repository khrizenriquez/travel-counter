import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { COUNTDOWNS } from "~/config/countdowns.server"
import { Countdown } from "~/components/Countdown"

export async function loader() {
  return json({
    countdowns: COUNTDOWNS.map(c => ({
      ...c,
      targetDate: new Date(c.targetDate)
    }))
  })
}

export default function Index() {
  const { countdowns } = useLoaderData<typeof loader>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          📅 Atención, tengan en mente las siguientes fechas para el viaje a...
        </h1>
        
        <div className="space-y-6">
          {countdowns.map((countdown) => (
            <Countdown
              key={countdown.id}
              title={countdown.title}
              target={new Date(countdown.targetDate)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}