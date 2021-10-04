import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import { Cell, Grid } from 'baseui/layout-grid';
import { SnackbarProvider } from 'baseui/snackbar';

import './Layout.css';

const engine = new Styletron();

function Layout(props) {
  const { children } = props;
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <SnackbarProvider>
          <Grid>
            <Cell span={[4, 8, 12]}>
              {children}
            </Cell>
          </Grid>
        </SnackbarProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default Layout;
