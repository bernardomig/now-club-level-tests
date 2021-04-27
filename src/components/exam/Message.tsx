import { Box, Typography, useTheme } from "@material-ui/core";
import Layout from "./Layout";

export default function Message({
  imageSrc,
  heading,
  message,
  actions,
}: {
  imageSrc: string;
  heading: string;
  message: string[];
  actions: any;
}) {
  const { spacing } = useTheme();
  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <img
          src={imageSrc}
          alt="intro"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "200px",
            marginBottom: spacing(2),
            marginTop: spacing(2),
          }}
        />

        <Typography variant="h4" component="h1">
          {heading}
        </Typography>

        <Box mt={2}>
          {message.map((m, index) => (
            <Typography paragraph key={index}>
              {m}
            </Typography>
          ))}
        </Box>

        <Box p={2}>{actions}</Box>
      </Box>
    </Layout>
  );
}
