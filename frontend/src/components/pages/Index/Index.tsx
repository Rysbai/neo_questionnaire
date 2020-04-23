import React from "react";
import {IndexPropsFromRedux} from "../../../containers/Index";
import MainNavbar from "../../navs/MainNavbar/MainNavbar";
import {Button, Card, CardContent, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {Add} from "@material-ui/icons";


export default function (props: IndexPropsFromRedux) {

  return (
    <div>
      <MainNavbar loggedUser={props.loggedUser}/>
      <Container>
        <Grid container spacing={2} justify="space-between">
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">О сайте</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">Мои опросы</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="small" color="secondary">Создать новый</Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Typography>У вас нету опросов</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">Недавно участвовал</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="small" color="secondary">Пройти опросник</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )

}