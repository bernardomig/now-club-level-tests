import { Paper, makeStyles, Theme } from "@material-ui/core";

export function Cell({ children }) {
  const { main } = useStyles();
  return <div className={main}>{children}</div>;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  main: {
    padding: spacing(3),
    "&:not(:last-child)": {
      borderBottom: `1px solid ${palette.divider}`,
    },
  },
}));

export default function Layout({ children }: { children: any | any[] }) {
  return (
    <Paper>
      {children instanceof Array ? (
        children.map((el, index) => <Cell key={index}>{el}</Cell>)
      ) : (
        <Cell>{children}</Cell>
      )}
    </Paper>
  );
}
