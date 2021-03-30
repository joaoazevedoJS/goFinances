import styled from 'styled-components';

export const Container = styled.header`
  background: var(--black);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 10rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;

    border: 1px solid #fff;
    background: transparent;
    border-radius: 0.25rem;

    padding: 0rem 2rem;
    height: 3rem;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background: #fff;
      color: var(--black);
    }
  }
`;
