import styled from 'styled-components';
import { shade, darken, transparentize } from 'polished';

import { Form } from '@unform/web';

interface RadioBoxProps {
  isActive: boolean;
  transactionType: 'deposit' | 'withdraw';
}

const TransactionType = {
  deposit: '#33CC95',
  withdraw: '#E52E4D',
};

export const Container = styled(Form)`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;

    border-radius: 0.25rem;
    border: 0;
    margin-top: 1.5rem;

    transition: background-color 0.5s;

    &:hover {
      background-color: ${shade(0.25, '#33CC95')};
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${props =>
    props.isActive
      ? transparentize(0.9, TransactionType[props.transactionType])
      : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.4s;

  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;
