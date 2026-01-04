'use client'

import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Instagram, Twitter } from "lucide-react";
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background pb-12 pt-12">
      <Container size="lg">

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 text-center text-sm text-foreground/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  );
}
