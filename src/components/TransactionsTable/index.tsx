import { FC } from 'react';

import { Container } from './styles';

const TransactionsTable: FC = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="income">R$12.000</td>
            <td>Freelancer</td>
            <td>20/02/2021</td>
          </tr>

          <tr>
            <td>Alugel</td>
            <td className="outcome">R$1.000</td>
            <td>Casa</td>
            <td>21/02/2021</td>
          </tr>

          <tr>
            <td>Desenvolvimento de website</td>
            <td className="income">R$12.000</td>
            <td>Freelancer</td>
            <td>20/02/2021</td>
          </tr>

          <tr>
            <td>Desenvolvimento de website</td>
            <td className="income">R$12.000</td>
            <td>Freelancer</td>
            <td>20/02/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export { TransactionsTable };
