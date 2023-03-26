import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <>
    <Image alt="Logo" src="logo.svg" width="32" height="32" />
  </>
)

export default Logo
