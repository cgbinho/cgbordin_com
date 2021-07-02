import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import { Container, BurguerContainer, SignedContainer } from './styles';
import Logo from '../Logos';
import Button from '../Form/Button';
import HamburgerButton from './HamburguerButton';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { HamburguerMenu } from './HamburguerMenu';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const [openBurguer, setOpenBurguer] = useState<boolean>(false);
  const { user, signOut } = useAuth();
  const email = user?.email;
  console.log(user);

  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpenBurguer(false));

  const close = () => setOpenBurguer(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Container>
      <Logo />
      <nav>
        <ul className="navbar_desktop">
          <li>
            <Link href="/">
              <a>Início</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>Projetos</a>
            </Link>
          </li>
          <li>
            <Link href="/aepzera">
              <a>Aepzera</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>Sobre</a>
            </Link>
          </li>
          <div className="vertical_line" />
          {!user ? (
            <>
              <li>
                <Link href="/sign-in">
                  <a>Entrar</a>
                </Link>
              </li>
              <li>
                <Link href="/sign-up">
                  <a>
                    <Button
                      primary
                      width="100%"
                      height="1rem"
                      padding="0.5rem 2rem"
                    >
                      Cadastrar
                    </Button>
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <SignedContainer>
              <li>
                <Link href="/orders">
                  <a>Pedidos</a>
                </Link>
              </li>
              <li>
                <small>{email}</small>
              </li>
              <li>
                <Button
                  width="100%"
                  height="1rem"
                  padding="0.5rem 2rem"
                  onClick={handleSignOut}
                >
                  Sair
                </Button>
              </li>
            </SignedContainer>
          )}
        </ul>
      </nav>
      <BurguerContainer>
        <HamburgerButton {...{ openBurguer, setOpenBurguer }} />
        <HamburguerMenu />
      </BurguerContainer>
    </Container>
  );
};

export default NavBar;
