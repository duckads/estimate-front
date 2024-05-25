import { Footer } from "antd/es/layout/layout";

export default function LayoutFooter() {
  return (
    <Footer>
      SHIELD ©{ new Date().getFullYear() }
    </Footer>
  )
}