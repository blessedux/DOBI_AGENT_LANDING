import * as React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-[#D4DAFC] shadow-lg rounded-xl p-6 border border-[#B3BCE6] relative ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E3E6F1]">{children}</div>
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="mb-2">{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
}

export function CardTitle({ children }: CardTitleProps) {
  return <h3 className="text-lg font-bold text-[#4A60DD] text-center">{children}</h3>
}

interface CardDescriptionProps {
  children: React.ReactNode
}

export function CardDescription({ children }: CardDescriptionProps) {
  return <p className="text-sm text-gray-600 text-center">{children}</p>
}

interface CardContentProps {
  children: React.ReactNode
}

export function CardContent({ children }: CardContentProps) {
  return <div className="mt-2">{children}</div>
}