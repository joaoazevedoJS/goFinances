import { FC } from 'react';

import LogoImg from '../../assets/logo.svg';

import { Container, Content } from './styles';

const Header: FC = () => {
  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="goFinances" />

        <button type="button">Nova transação</button>
      </Content>
    </Container>
  );
};

export { Header };
