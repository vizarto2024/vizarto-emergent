import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { addToWaitlist, isValidEmail } from "../lib/waitlist";
import { useToast } from "../hooks/use-toast";

const NotifyDialog = ({ open, onOpenChange, plan, audience }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    const result = addToWaitlist({ email, plan: plan?.name, audience });
    if (!result.ok && result.reason === "duplicate") {
      toast({
        title: "You're already on the list",
        description: `We'll email ${email} when ${plan?.name} launches.`,
      });
    } else {
      toast({
        title: "You're on the waitlist!",
        description: `We'll email ${email} the moment ${plan?.name} goes live.`,
      });
    }
    setDone(true);
  };

  const reset = () => {
    setEmail("");
    setError("");
    setDone(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="sm:max-w-md rounded-2xl">
        {!done ? (
          <>
            <DialogHeader>
              <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center font-display text-2xl">
                Get notified at launch
              </DialogTitle>
              <DialogDescription className="text-center">
                Be the first to know when <span className="font-semibold text-slate-900">{plan?.name}</span> is live.
                We'll email you and no-one else.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@company.com"
                  className="h-11"
                  autoFocus
                />
                {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-brand-600 hover:bg-brand-700 rounded-full font-semibold"
              >
                Notify me at launch
              </Button>
              <p className="text-xs text-slate-500 text-center">
                No spam. Unsubscribe with a click.
              </p>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              You're on the list!
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              We'll email <span className="font-semibold text-slate-900">{email}</span> the moment{" "}
              <span className="font-semibold text-slate-900">{plan?.name}</span> launches.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-6 rounded-full bg-slate-900 hover:bg-slate-800"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotifyDialog;
