import React from 'react'

type AccordionProps = {
  title: string;
  children: React.ReactNode;
}

export const Accordion = (props: AccordionProps) => {
  const { title, children } = props
  return (
    <div className="accordion">
      <h3 className="accordion-title">{title}</h3>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  )
}
