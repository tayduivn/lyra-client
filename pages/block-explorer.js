import React from 'react';
import { Mutation } from 'react-apollo';
import {
  Container,
  Main,
  Aside,
  Panel
} from '../shared/library/components/layout';

import SimpleButton from '../shared/library/components/buttons/simple';

import { MINT_TOKENS } from '../data/mutations';

const BlockExplorer = () => (
  <Container>
    <Main>
      <Panel>
        <Mutation mutation={MINT_TOKENS}>
          {mintTokens => (
            <SimpleButton
              onClick={() =>
                mintTokens({
                  variables: {
                    amount: 100
                  }
                })
              }
            >
              Mint 100 LYRA
            </SimpleButton>
          )}
        </Mutation>
      </Panel>
    </Main>
    <Aside>Aside</Aside>
  </Container>
);

export default BlockExplorer;
