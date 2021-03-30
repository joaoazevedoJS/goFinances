import { FC } from 'react';

import LogoImg from '../../assets/logo.svg';
import { useTransactions } from '../../hooks/transactions';

import { Container, Content } from './styles';

const Header: FC = () => {
  const { handleOpenModalTransaction } = useTransactions();

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="goFinances" />

        <button type="button" onClick={handleOpenModalTransaction}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};

export { Header };
