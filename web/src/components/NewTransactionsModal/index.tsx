import { FC, useCallback, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';
import Draggable from 'react-draggable';

import { CreateTransaction, useTransactions } from '../../hooks/transactions';

import { Input } from '../Input';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

const NewTransactionsModal: FC = () => {
  const DraggableRef = useRef(null);

  const {
    isNewTransactionModalOpen,
    handleCloseModalTransaction,
    handleCreateTransaction,
  } = useTransactions();

  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

  const handleCreateNewTransaction = useCallback(
    (data: Omit<CreateTransaction, 'type'>) => {
      handleCreateTransaction({ ...data, type });
    },
    [handleCreateTransaction, type],
  );

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseModalTransaction}
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
      className="react-modal"
    >
      <Draggable nodeRef={DraggableRef}>
        <div ref={DraggableRef} className="react-modal-content">
          <FiX
            onClick={handleCloseModalTransaction}
            className="react-modal-button-close"
          />

          <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <Input name="title" placeholder="Título" />

            <Input name="value" type="number" placeholder="Valor" />

            <TransactionTypeContainer>
              <RadioBox
                isActive={type === 'deposit'}
                transactionType="deposit"
                type="button"
                onClick={() => {
                  setType('deposit');
                }}
              >
                <img src={incomeImg} alt="Entrada" />

                <span>Entrada</span>
              </RadioBox>

              <RadioBox
                isActive={type === 'withdraw'}
                transactionType="withdraw"
                type="button"
                onClick={() => {
                  setType('withdraw');
                }}
              >
                <img src={outcomeImg} alt="Saída" />

                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>

            <Input name="category" placeholder="Categoria" />

            <button type="submit">Cadastrar</button>
          </Container>
        </div>
      </Draggable>
    </Modal>
  );
};

export { NewTransactionsModal };
