#!/bin/bash

# Define the path to the parent directory
parent_dir="/var/www"

# Initialize counters
total_sites=0
online_sites=0
offline_sites=0

echo "----- Starting PM2 Process Check & Start Script -----"

# Loop through the immediate directories inside /var/www (no recursion)
for site_dir in "$parent_dir"/*; do
    if [ -d "$site_dir" ]; then
        process_name=$(basename "$site_dir")
        total_sites=$((total_sites + 1))
        
        echo "Processing site: $process_name"

        cd "$site_dir" || continue

        # Mark as safe directory for git (still useful if needed)
        git config --global --add safe.directory "$site_dir"

        # Check if process is already managed by PM2
        if ! pm2 ls | grep -qw "$process_name"; then
            echo "PM2 process not found for $process_name. Starting with pm2..."
            # pm2 start npm --name "$process_name" -- start
        else
            echo "PM2 process for $process_name already exists."
        fi

        cd -
    fi
done

# Save the PM2 process list
echo "Saving PM2 process configuration..."
pm2 save

# Display PM2 process list
echo "Fetching PM2 process status..."
pm2 ls

# Check which are online and offline
echo "Analyzing site statuses..."
for site_dir in "$parent_dir"/*; do
    if [ -d "$site_dir" ]; then
        process_name=$(basename "$site_dir")
        pm2_status=$(pm2 ls | grep -w "$process_name" | awk '{print $5}')

        if [ "$pm2_status" == "online" ]; then
            online_sites=$((online_sites + 1))
        else
            offline_sites=$((offline_sites + 1))
        fi
    fi
done

# Summary
echo "----------------- Summary -----------------"
echo "Total sites processed: $total_sites"
echo "Online sites:          $online_sites"
echo "Offline sites:         $offline_sites"
echo "Script completed successfully. 🚀"
