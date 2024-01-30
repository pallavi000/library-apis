// MUI
import { Button, CircularProgress } from "@mui/material";
import { ColorVariant } from "../@types/theme";

type LoadingButtonProps = {
  isLoading: boolean;
  color: ColorVariant;
  title: string;
  isDisabled?: boolean;
};

function LoadingButton({
  isLoading,
  color,
  title,
  isDisabled = false,
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || isDisabled}
      variant="contained"
      color={color}
      type="submit"
    >
      {isLoading ? <CircularProgress size={24} /> : <>{title}</>}
    </Button>
  );
}

export default LoadingButton;
