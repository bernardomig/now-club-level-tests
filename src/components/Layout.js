import { Box, Typography, Button } from "@material-ui/core";

export default function Layout({
  title,
  description,
  children,
  onNext,
  onPrev,
}) {
  return (
    <Box>
      <Box component="header" mb={4}>
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>

        {description}
      </Box>

      <main>{children}</main>

      <Box
        mt={4}
        component="footer"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box>
          {onPrev && (
            <Button
              size="large"
              variant="text"
              color="default"
              onClick={() => onPrev()}
            >
              Back
            </Button>
          )}
        </Box>
        <Box>
          {onNext && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => onNext()}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
