import type { DialogProps as MuiDialogProps, DialogTitleProps, DialogActionsProps } from '@mui/material';
export type WillowModalVariant = 'standard' | 'fullscreen' | 'centered';
/**
 * Layout options for ModalActions footer.
 * - 'end': All buttons right-aligned (default, most common)
 * - 'split': First child left, rest right (for Delete + Cancel/Save patterns)
 * - 'center': All buttons centered (for single-action confirmations)
 */
export type ModalActionsLayout = 'end' | 'split' | 'center';
/**
 * Semantic size options for Modal width.
 * - 'sm': 400px - Confirmations, simple forms, alerts
 * - 'md': 560px - Standard forms, content dialogs (DEFAULT)
 * - 'lg': 720px - Complex forms, tables, multi-step flows
 * - 'xl': 900px - Large content, side-by-side comparisons
 * - 'full': 100% viewport width - Full-screen experiences
 *
 * Migration from MUI maxWidth:
 * - maxWidth="xs" → size="sm"
 * - maxWidth="sm" → size="md"
 * - maxWidth="md" → size="lg"
 * - maxWidth="lg" → size="xl"
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export interface ModalProps extends Omit<MuiDialogProps, 'variant'> {
    variant?: WillowModalVariant;
    /**
     * Modal width using semantic size names.
     * Prefer this over maxWidth for consistent sizing across the app.
     *
     * @default 'md'
     * @example
     * <Modal open={open} onClose={handleClose} size="lg">
     *   <ModalTitle>Complex Form</ModalTitle>
     *   <ModalContent>...</ModalContent>
     * </Modal>
     */
    size?: ModalSize;
    /**
     * When true, renders a close button (X) in the top-right corner of ModalTitle.
     * The close button uses variant="ghost" styling and calls onClose when clicked.
     *
     * @example
     * <Modal open={open} onClose={handleClose} showCloseButton>
     *   <ModalTitle>My Dialog</ModalTitle>
     *   <ModalContent>Content here</ModalContent>
     * </Modal>
     */
    showCloseButton?: boolean;
    /**
     * When true, disables the auto-rendered close button (requires showCloseButton).
     * Use this to prevent users from closing the modal during form submission.
     *
     * @example
     * <Modal open={open} onClose={handleClose} showCloseButton closeButtonDisabled={isSubmitting}>
     *   <ModalTitle>Edit Student</ModalTitle>
     *   <ModalContent>...</ModalContent>
     * </Modal>
     */
    closeButtonDisabled?: boolean;
}
export interface ModalContextValue {
    onClose?: (event: Record<string, never>, reason: string) => void;
    showCloseButton?: boolean;
    closeButtonDisabled?: boolean;
    /**
     * Whether the ModalContent has overflowing content (scrollHeight > clientHeight).
     * Used by ModalActions to show a shadow when content is scrollable.
     */
    isContentScrollable?: boolean;
    /**
     * Callback for ModalContent to report its overflow state.
     * @internal
     */
    setContentScrollable?: (scrollable: boolean) => void;
}
export interface ModalTitleProps extends DialogTitleProps {
    children?: React.ReactNode;
}
export interface ModalActionsProps extends DialogActionsProps {
    /**
     * Layout preset for action buttons.
     * - 'end': All buttons right-aligned (default)
     * - 'split': First child left, rest right (for Delete + Cancel/Save)
     * - 'center': All buttons centered (for single-action confirmations)
     *
     * @default 'end'
     * @example
     * // Default: Cancel and Save right-aligned
     * <ModalActions>
     *   <TextButton variant="secondary">Cancel</TextButton>
     *   <TextButton variant="primary">Save</TextButton>
     * </ModalActions>
     *
     * // Split: Delete left, Cancel/Save right
     * <ModalActions layout="split">
     *   <TextButton variant="critical">Delete</TextButton>
     *   <TextButton variant="secondary">Cancel</TextButton>
     *   <TextButton variant="primary">Save</TextButton>
     * </ModalActions>
     *
     * // Center: Single action centered
     * <ModalActions layout="center">
     *   <TextButton variant="primary">Got it</TextButton>
     * </ModalActions>
     */
    layout?: ModalActionsLayout;
    children?: React.ReactNode;
}
//# sourceMappingURL=Modal.types.d.ts.map