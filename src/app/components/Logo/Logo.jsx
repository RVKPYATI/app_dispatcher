import Image from 'next/image';
import logo from '@/assets/logo.png';

const Logo = ({style}) => {
  return (
      <Image
      src={logo}
      width={45}
      height={45}
      alt="logo"
      className={style}
    />
  )
}

export default Logo