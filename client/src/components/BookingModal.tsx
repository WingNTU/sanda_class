import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { X, Clock, Calendar as CalendarIcon, User, MessageCircle, Target } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingData {
  name: string;
  telegramHandle: string;
  program: string;
  selectedDate: Date | null;
  timeSlot: string;
  remarks: string;
}

interface FormErrors {
  name?: string;
  telegramHandle?: string;
  program?: string;
  selectedDate?: string;
  timeSlot?: string;
  remarks?: string;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    telegramHandle: "",
    program: "Group Classes",
    selectedDate: null,
    timeSlot: "5:30 PM - 7:00 PM",
    remarks: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Available time slots (only weekends 5pm-6:30pm)
  const availableTimeSlots = [
    "5:30 PM - 7:00 PM"
  ];

  // Check if selected date is weekend (Saturday or Sunday)
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Disable dates that are not weekends or are in the past
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || !isWeekend(date);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.telegramHandle.trim() || formData.telegramHandle === '@') {
      newErrors.telegramHandle = "Telegram handle is required";
    } else if (formData.telegramHandle.length < 2) {
      newErrors.telegramHandle = "Please enter a valid telegram handle";
    }

    if (!formData.program) {
      newErrors.program = "Please select a program";
    }

    if (!formData.selectedDate) {
      newErrors.selectedDate = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || "";
      const apiEndpoint = API_URL ? `${API_URL}/api/bookings` : "/api/bookings";
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Send confirmation message to user via Telegram
        try {
          const confirmationMessage = `🥊 *Booking Confirmation* 🥊\n\n` +
            `Hi ${formData.name}! Your Sanda training session request has been received.\n\n` +
            `📋 *Details:*\n` +
            `• Program: ${formData.program}\n` +
            `• Date: ${formData.selectedDate?.toLocaleDateString()}\n` +
            `• Time: ${formData.timeSlot}\n` +
            `${formData.remarks ? `• Notes: ${formData.remarks}\n` : ''}` +
            `\n✅ I'll review your request and confirm the session details with you soon.\n` +
            `💪 Looking forward to training with you!\n\n` +
            `- Wing (Sanda Coach)`;

          const telegramResponse = await fetch(apiEndpoint.replace('/bookings', '/send-telegram'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              telegramHandle: formData.telegramHandle,
              message: confirmationMessage
            }),
          });

          if (telegramResponse.ok) {
            alert('Booking request submitted successfully! Check your Telegram for a confirmation message.');
          } else {
            alert('Booking request submitted successfully! I will contact you via Telegram soon.');
          }
        } catch (telegramError) {
          console.error('Telegram confirmation error:', telegramError);
          alert('Booking request submitted successfully! I will contact you via Telegram soon.');
        }

        onClose();
        // Reset form
        setFormData({
          name: "",
          telegramHandle: "",
          program: "Group Classes",
          selectedDate: null,
          timeSlot: "5:30 PM - 7:00 PM",
          remarks: ""
        });
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMessage = error.message || 'Failed to submit booking. Please try again.';
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-martial-gold" />
            Book Your Sanda Session
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-martial-gold" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Telegram Handle Field */}
          <div className="space-y-2">
            <Label htmlFor="telegram" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-martial-gold" />
              Telegram Handle *
            </Label>
            <Input
              id="telegram"
              value={formData.telegramHandle}
              onChange={(e) => {
                let value = e.target.value;
                // Ensure the value always starts with '@'
                if (!value.startsWith('@')) {
                  value = '@' + value.replace(/^@+/, ''); // Remove any existing @ symbols and add one at the start
                }
                setFormData(prev => ({ ...prev, telegramHandle: value }));
              }}
              placeholder="@your_telegram_handle"
              className={errors.telegramHandle ? "border-red-500" : ""}
            />
            {errors.telegramHandle && <p className="text-sm text-red-500">{errors.telegramHandle}</p>}
            <p className="text-xs text-muted-foreground">
              I'll contact you via Telegram to confirm your session
            </p>
          </div>

          {/* Program Selection */}
          <div className="space-y-2">
            <Label htmlFor="program" className="flex items-center gap-2">
              <Target className="w-4 h-4 text-martial-gold" />
              Select Program *
            </Label>
            <Select value={formData.program} onValueChange={(value) => setFormData(prev => ({ ...prev, program: value }))}>
              <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                <SelectValue placeholder="Choose a training program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Group Classes">
                  <div className="flex flex-col">
                    <span className="font-medium"><br />Group Classes</span>
                    <span className="text-sm text-muted-foreground">$35/session • 90 minutes • Shared learning experience<br /></span>
                  </div>
                </SelectItem>
                <SelectItem value="Trial Class">
                  <div className="flex flex-col">
                    <span className="font-medium"><br />Trial Class</span>
                    <span className="text-sm text-muted-foreground">First timer? It's free! Come and experience how a group sanda class works.<br /></span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.program && <p className="text-sm text-red-500">{errors.program}</p>}
            <p className="text-xs text-muted-foreground">
              Choose the training program that best fits your goals
            </p>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-martial-gold" />
              Select Date (Weekends Only) *
            </Label>
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={formData.selectedDate || undefined}
                onSelect={(date) => setFormData(prev => ({ ...prev, selectedDate: date || null }))}
                disabled={isDateDisabled}
                className="rounded-md border"
              />
            </Card>
            {errors.selectedDate && <p className="text-sm text-red-500">{errors.selectedDate}</p>}
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-martial-gold" />
              Available Time Slot
            </Label>
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-martial-red" />
                <span className="font-medium">Saturday: 5:30 PM - 7:00 PM</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                All sessions are 90mins long with personalized attention in a small group setting
              </p>
            </Card>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">
              Additional Remarks (Optional)
            </Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Any specific goals, experience level, or questions you'd like to share..."
              rows={4}
            />
          </div>

          {/* confirm booking */}
          <div>
            <p className="text-sm text-muted-foreground">
              By submitting this booking request, a telegram confirmation message will be sent to your provided handle. 
              Payment to be made upon confirmation of the session.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;