import React from "react";
import { Grid, Typography } from "@mui/material";

import styles from "../scss/Account.module.scss";
import Account from "../components/account/Account";

export default function AccountPage() {
  return (
    <div className={styles.account}>
      <Grid container sx={{ mt: 25 }}>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </div>
  );
}
