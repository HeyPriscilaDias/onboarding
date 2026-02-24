import { DialogContentProps } from '@mui/material';
import { ModalProps, ModalTitleProps, ModalActionsProps } from './Modal.types.js';
/**
 * Modal - A dialog component for displaying content that requires user attention.
 *
 * LLM Usage Guide:
 * - Use `size` prop for consistent modal widths (preferred over `maxWidth`)
 * - Close button appears by default; use showCloseButton={false} to hide it (e.g., nested confirmations)
 * - Always provide onClose handler when using showCloseButton
 * - Use ModalTitle, ModalContent, and ModalActions as children
 * - **Button labels MUST use sentence case**: "Save changes", NOT "Save Changes"
 *   - First word capitalized, rest lowercase (unless proper noun/acronym)
 *   - Examples: "Add item", "Save changes", "Delete student", "OK", "Cancel"
 *   - Wrong: "Add Item", "Save Changes", "Delete Student"
 *
 * Size options:
 * - 'sm' (400px): Confirmations, simple forms, alerts
 * - 'md' (560px): Standard forms, content dialogs (DEFAULT)
 * - 'lg' (720px): Complex forms, tables, multi-step flows
 * - 'xl' (900px): Large content, side-by-side comparisons
 * - 'full' (100vw): Full-screen experiences
 *
 * @example
 * // Basic modal with close button and size
 * <Modal open={isOpen} onClose={handleClose} size="md" showCloseButton>
 *   <ModalTitle>Confirm action</ModalTitle>
 *   <ModalContent>Are you sure?</ModalContent>
 *   <ModalActions>
 *     <TextButton variant="secondary" onClick={handleClose}>Cancel</TextButton>
 *     <TextButton variant="primary" onClick={handleConfirm}>Confirm</TextButton>
 *   </ModalActions>
 * </Modal>
 *
 * @example
 * // Large modal for complex forms
 * <Modal open={isOpen} onClose={handleClose} size="lg">
 *   <ModalTitle>Edit student details</ModalTitle>
 *   <ModalContent>...</ModalContent>
 * </Modal>
 */
export declare const Modal: import("react").ForwardRefExoticComponent<Omit<ModalProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * ModalTitle - Header section of a Modal.
 *
 * When the parent Modal has showCloseButton={true}, this component automatically
 * renders a close button (X) in the top-right corner. No manual IconButton needed.
 *
 * @example
 * <Modal open={open} onClose={handleClose} showCloseButton>
 *   <ModalTitle>My Dialog Title</ModalTitle>
 *   ...
 * </Modal>
 */
export declare const ModalTitle: import("react").ForwardRefExoticComponent<Omit<ModalTitleProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * ModalActions - Footer section of a Modal with action buttons.
 *
 * Supports three layout presets:
 * - 'end' (default): All buttons right-aligned
 * - 'split': First child left, rest right (for Delete + Cancel/Save)
 * - 'center': All buttons centered (for single-action confirmations)
 *
 * Automatically shows an animated shadow when ModalContent has scrollable overflow,
 * providing a visual affordance that there is more content above.
 *
 * @example
 * // Default layout (buttons right-aligned)
 * <ModalActions>
 *   <TextButton variant="secondary">Cancel</TextButton>
 *   <TextButton variant="primary">Save</TextButton>
 * </ModalActions>
 *
 * // Split layout (Delete left, Cancel/Save right)
 * <ModalActions layout="split">
 *   <TextButton variant="critical">Delete</TextButton>
 *   <TextButton variant="secondary">Cancel</TextButton>
 *   <TextButton variant="primary">Save</TextButton>
 * </ModalActions>
 *
 * // Center layout (single action centered)
 * <ModalActions layout="center">
 *   <TextButton variant="primary">Got it</TextButton>
 * </ModalActions>
 */
export declare const ModalActions: import("react").ForwardRefExoticComponent<Omit<ModalActionsProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * ModalContent - Scrollable content area of a Modal.
 *
 * Automatically detects when content overflows and communicates this to ModalActions,
 * which will show an animated shadow to indicate scrollable content.
 *
 * @example
 * <Modal open={open} onClose={handleClose}>
 *   <ModalTitle>Terms and Conditions</ModalTitle>
 *   <ModalContent>
 *     {longContent}
 *   </ModalContent>
 *   <ModalActions>
 *     <TextButton variant="primary">Accept</TextButton>
 *   </ModalActions>
 * </Modal>
 */
export declare const ModalContent: import("react").ForwardRefExoticComponent<Omit<DialogContentProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Modal.d.ts.map