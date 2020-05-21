import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalContent from "./ModalContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll"
  }
}));

export default function TransitionsModal({
  title,
  image,
  description,
  id,
  instructions,
  ingredients,
  sourceUrl,
  searchIngredients,
  instructionsTitle,
  children,
  translateSpoonacular,
  translatedTitle,
  resetToEnglish
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onClick = e => {
    searchIngredients(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" variant="outlined" onClick={onClick}>
        View Recipe
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <ModalContent
            title={title}
            image={image}
            id={id}
            description={description}
            ingredients={ingredients}
            instructionsTitle={instructionsTitle}
            instructions={instructions}
            sourceUrl={sourceUrl}
            children={children}
            translateSpoonacular={translateSpoonacular}
            translatedTitle={translatedTitle}
            resetToEnglish={resetToEnglish}
          />
        </Fade>
      </Modal>
    </div>
  );
}
