import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Hero() {
  return (
    <section className="relative w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">MintSafe</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Secure, fast and reliable payments made simple.
        </p>

        {/* Carousel with arrows */}
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-64">
                  <img
                    src="https://source.unsplash.com/600x400/?finance"
                    alt="Slide 1"
                    className="rounded-lg shadow-md"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-64">
                  <img
                    src="https://source.unsplash.com/600x400/?payment"
                    alt="Slide 2"
                    className="rounded-lg shadow-md"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-64">
                  <img
                    src="https://source.unsplash.com/600x400/?bank"
                    alt="Slide 3"
                    className="rounded-lg shadow-md"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
