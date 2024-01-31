// MUI
import { Button, CircularProgress } from "@mui/material";
import { ColorVariant } from "../@types/theme";

type LoadingButtonProps = {
  isLoading: boolean;
  color: ColorVariant;
  title: string;
  isDisabled?: boolean;
  handleClick?: () => void;
};

function LoadingButton({
  isLoading,
  color,
  title,
  isDisabled = false,
  handleClick = () => {},
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || isDisabled}
      variant="contained"
      color={color}
      type="submit"
      onClick={handleClick}
    >
      {isLoading ? <CircularProgress size={24} /> : <>{title}</>}
    </Button>
  );
}

export default LoadingButton;
