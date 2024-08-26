import { Darker_Grotesque, Grey_Qo } from 'next/font/google'
import Image from 'next/image'

export type Props = {
  title: string
}
export const TemplateFooter = (props: Props) => {
  return (
    <footer
      className="bg-footer text-center"
      style={{ position: 'sticky', left: '0', bottom: '0', width: '100%' }}
    >
      <div>{props.title}</div>
    </footer>
  )
}
