import { DialogTitleProps, DialogContentProps, DialogActionsProps } from '@mui/material';
import type { ModalProps, ModalActionsLayout } from './Modal.types.js';
export declare const StyledModal: React.ComponentType<ModalProps>;
export declare const StyledDialogTitle: React.ComponentType<DialogTitleProps>;
export declare const StyledDialogContent: React.ComponentType<DialogContentProps>;
export interface StyledDialogActionsProps extends DialogActionsProps {
    $layout?: ModalActionsLayout;
    /**
     * When true, shows an animated shadow above the footer to indicate scrollable content.
     */
    $showShadow?: boolean;
}
export declare const StyledDialogActions: React.ComponentType<StyledDialogActionsProps>;
//# sourceMappingURL=Modal.styled.d.ts.map