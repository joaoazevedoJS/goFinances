import { FC } from 'react';

import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { TransactionsTable } from '../../components/TransactionsTable';

import { Container } from './styles';

const Dashboard: FC = () => {
  return (
    <>
      <Header />

      <Container>
        <Summary />

        <TransactionsTable />
      </Container>
    </>
  );
};

export { Dashboard };
