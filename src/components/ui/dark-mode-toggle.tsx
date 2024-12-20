"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"
import { Hint } from "@/components/hint"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center space-x-2">
            <Hint label="Alternar tema">
                <Switch onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-gray-700 dark:bg-gray-300" />
            </Hint>
        </div>
    )
}
